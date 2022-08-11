import { Flex } from "@chakra-ui/react";
import Apresentation from "../apresentation";
import Header from "../header";

export function Desktop () {
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