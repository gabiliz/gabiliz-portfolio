import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Button, Flex, HStack, Link, useColorMode } from "@chakra-ui/react"

function Header () {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
    alignItems='baseline'
    justifyContent='space-evenly'
    >
    <Link href="https://github.com/gabiliz" target="_blank">
      Projects
    </Link>
    <Link href="https://www.linkedin.com/in/gabriela-liz-moreira/" target="_blank">
      Contact
    </Link>
    <Button
      onClick={toggleColorMode}>
        {colorMode === "dark" ? (
          <SunIcon color="orange.200" />
        ) : (
          <MoonIcon color="blue.700" />
        )}
    </Button>
  </Flex>
  )

}
export default Header