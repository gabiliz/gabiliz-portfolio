import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Link, Text, useColorMode } from '@chakra-ui/react'
import './App.css'
import Apresentation from './components/apresentation';
import Header from './components/header';

function App() {

  return (
    <Flex
      width='100vw'
      height='100vh'
      flexDirection='column'
      padding='2%'
    >
      <Header />
      <Apresentation />
    </Flex>
  )
}

export default App
