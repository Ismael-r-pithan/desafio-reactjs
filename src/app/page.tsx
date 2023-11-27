'use client'

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Heading,
  InputGroup
} from '@chakra-ui/react'
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup';
import { AppError } from '@/lib/app-error';
import { useToast } from '@chakra-ui/react';
import { signInValidator } from '@/validators/sign-in.validator';


export type SignInProps = {
  email: string;
  password: string;
}

import { useAuth } from "@/hooks/useAuth";



export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const toast = useToast();
  const { signIn } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<SignInProps>({
      resolver: yupResolver(signInValidator)
  });

  const router = useRouter();

  async function handleSignIn({ email, password }: SignInProps) {
    try {
        setIsLoading(true); 
        await signIn(email, password)
        router.push('/projects/1');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível fazer o login no momento, Tente novamente mais tarde";
      setIsLoading(false);
      toast({
          title,
          duration: 9000,
          isClosable: true,
          colorScheme: 'red',
          position: 'top'
      }) 
    } finally {
      setIsLoading(false);
    }
}

  return (
<Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} minW={'480px'} py={12} px={6}>
      <Stack align={'center'}>
          <Heading fontSize={'4xl'} mb={8}>Entra na Khipo</Heading>
        </Stack>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input type="email" {...field} />
            )}
          />

          {errors.email && <Text color="red.500">{errors.email.message}</Text>}
        </FormControl>


        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input type={showPassword ? 'text' : 'password'} {...field} />
              )}
            />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && <Text color="red.500">{errors.password.message}</Text>}
        </FormControl>

        <Button
          loadingText="Submitting"
          size="lg"
          bg={'blue.400'}
          color={'white'}
          onClick={handleSubmit(handleSignIn)}
          _hover={{
            bg: 'blue.500',
          }}
          isLoading={isLoading}
        >
          Entrar
        </Button>
      </Stack>
    </Flex>
  )
}