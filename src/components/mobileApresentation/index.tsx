import { Box, Image, Text, Heading, Highlight, useColorMode, Flex } from "@chakra-ui/react";

export function Apresentation () {
  const { colorMode } = useColorMode();

  return (
    <Box
      display='flex'
      alignItems='center'
      flexDirection='column'
      marginTop='20%'
    >
      <Image  
        borderRadius='full'
        boxSize='150px'
        objectFit='cover'
        src="https://i.imgur.com/DtilFz1.jpg?1" />
      <Flex
        flexDirection='column'
        alignItems='center'
        marginTop='20%'
      >
      <Text color='#828282'>
      👋 Hi there, my name is
      </Text>
      <Heading 
        size='3xl' 
        fontWeight='600'
        marginY='25px'
      >
        Gabriela Liz
      </Heading>
        <Text color='#828282'>
        {colorMode === "dark" ? (
          <Highlight 
            query='Software Engineer' 
            styles={{ color: 'white' }}
          >
          and I am a Software Engineer from Brazil 🇧🇷
          </Highlight>
        ) : (
          <Highlight 
            query='Software Engineer' 
            styles={{ color: 'black' }}
          >
            and I am a Software Engineer from Brazil 🇧🇷
          </Highlight>
        )}
        </Text>
      </Flex>
    </Box>
  )
}