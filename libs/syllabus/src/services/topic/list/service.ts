import { LearningAppSupabase } from '@learning-app/supabase';
import { TopicListRequest, TopicListResponse } from './types';

/**
 * Retrieves a list of topic with optional filtering and  sorting .
 *
 * @param supabase - The Supabase client instance to use for the query.
 * @param params - An object containing parameters to filter and sort the results.
 * @returns A promise that resolves to an array of partial Topic objects representing the topic.
 */

export async function getTopics(
  supabaseCilent: LearningAppSupabase,
  params: TopicListRequest
): Promise<TopicListResponse> {
  const { subjectId, filters, sort } = params;

  let query = supabaseCilent
    .from('Topic')
    .select('*', {
      count: 'exact',
    })
    .match({ subjectId });

  if (filters?.q) {
    query = query.or(
      `title.ilike.*${filters.q}*, title_ar.ilike.*${filters.q}*`
    );
  }

  if (sort) {
    query = query.order(sort.field, { ascending: sort.ascending });
  } else {
    query = query.order('createdAt', { ascending: false });
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return { data, count: count ?? 0 };
}
