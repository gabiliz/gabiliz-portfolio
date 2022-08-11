import { Flex } from "@chakra-ui/react";
import Header from "../header";
import { Apresentation } from "../mobileApresentation";

export function Mobile () {
  return (
      <Flex
      marginTop='3%'
      flexDirection='column'
      >
        <Header />
        <Apresentation />
      </Flex>
  )
}