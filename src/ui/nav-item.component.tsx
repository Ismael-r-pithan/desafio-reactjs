import { Box, Flex, FlexProps } from "@chakra-ui/react";

interface NavItemProps extends FlexProps {
    title: string;
  }

export function NavItemComponent ({  title, ...rest }: NavItemProps) {
    return (
      <Box
        as="a"
        href="#"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          backgroundColor='var(--gray-100)'
          my={2}
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}>
          {title}
        </Flex>
      </Box>
    )
  }