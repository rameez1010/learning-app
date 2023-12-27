import React from 'react';
import HomeFooterView from '../footer/HomeFooterView';
import StageCard from './stage-card/StageCard';
import { Box, Text, Image, View } from '@gluestack-ui/themed';
import { useCourses } from '@learning-app/syllabus';
import { useActiveUser } from '@learning-app/auth';
import HomePageBanner from 'assets/homepageBanner.jpg';
import { Dimensions } from 'react-native';

const HomeView = () => {
  const TEMP_COURSE = 'CA';
  const { data: { data: courses } = { data: [] } } = useCourses();

  const colors = ['#D6A8D4', '#94B6BB', '#FBB6B1', '#FF33D1', '#33D1FF'];
  const { user } = useActiveUser();

  // 16:9 Aspect Ratio
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width;

  return (
    <Box flex={1} width="$full">
      <Text fontSize="$xl" color="black" fontWeight="$bold" ml="$5" py="$5">
        Hello {user.firstName}!
      </Text>
      <Box bg="white" p="$1.5">
        <Image
          borderRadius={10}
          style={{
            resizeMode: 'contain',
            width: imageWidth,
            height: imageHeight,
          }}
          alt="homepageBanner"
          source={HomePageBanner}
        />
      </Box>
      <Text fontSize="$xl" color="black" fontWeight="$medium" ml="$5" py="$5">
        Choose your stage
      </Text>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
        borderRadius="$2xl"
      >
        {(
          (courses ?? []).find((c) => c.title === TEMP_COURSE)?.stages ?? []
        ).map((stage, index) => (
          <View
            borderRadius="$lg"
            key={stage.id}
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            <StageCard
              stage={stage.title}
              href={`/course-stages/${stage.id}`}
            />
          </View>
        ))}
      </Box>
      <HomeFooterView />
    </Box>
  );
};

export default HomeView;
