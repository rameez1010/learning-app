import React, { FC } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Box } from '@gluestack-ui/themed';

type StageCardProps = {
  stage: string;
  href: string;
};

const StageCard: FC<StageCardProps> = ({ stage, href }) => {
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      style={{ marginTop: '100px' }}
    >
      <Box
        maxWidth="$64"
        borderColor="#171717"
        borderRadius="$lg"
        borderWidth="$1"
        my="$4"
        backgroundColor="#fdf4ff"
        overflow="hidden"
        sx={{
          '@base': {
            mx: '$5',
          },
          _dark: {
            bg: '$backgroundDark900',
            borderColor: '$borderDark800',
          },
        }}
      >
        <Link href={href} asChild>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>{stage}</Text>
          </TouchableOpacity>
        </Link>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 5,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default StageCard;
