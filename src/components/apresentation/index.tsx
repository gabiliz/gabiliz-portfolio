import { Flex, Text, Image, Box, Heading, Highlight, useColorMode } from "@chakra-ui/react"

function Apresentation () {
  const { colorMode } = useColorMode();

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      marginTop='12%'
    >
      <Flex
        flexDirection='column'
        marginRight='200px'
      >
      <Text color='#828282'>
      👋 Hi there, my name is
      </Text>
      <Heading 
        size='4xl' 
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
      <Image  
        borderRadius='full'
        boxSize='300px'
        objectFit='cover'
        src="https://avatars.githubusercontent.com/u/54365855?v=4" />
    </Box>
  )
}
export default Apresentation
