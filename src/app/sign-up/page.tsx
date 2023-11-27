'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Heading
} from '@chakra-ui/react'
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidator } from '@/validators/sign-up.validator';
import { handleSignUp } from '@/api/sign-up';
import { AppError } from '@/lib/app-error';
import { useToast } from '@chakra-ui/react';
import Link from 'next/link';




export type SignUpProps = {
  email: string;
  name: string;
  password: string;
  password_confirm: string;
}

export default function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpProps>({
      resolver: yupResolver(signUpValidator)
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpProps) => {
    setIsLoading(true);
    try {
      await handleSignUp(data);
      router.push('/sign-in');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível criar a conta, Tente novamente mais tarde";
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
  };
  return (
<Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} minW={'480px'} py={12} px={6}>
      <Stack align={'center'}>
          <Heading fontSize={'4xl'} mb={8}>Cadastre-se na Khipo</Heading>
        </Stack>
        <FormControl id="name" isRequired>
          <FormLabel>Nome</FormLabel>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input type="text" {...field} />
            )}
          />
          {errors.name && <Text color="red.500">{errors.name.message}</Text>}
        </FormControl>
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
        <FormControl id="password_confirm" isRequired>
          <FormLabel>Confirmar Password</FormLabel>
          <Controller
            name="password_confirm"
            control={control}
            render={({ field }) => (
              <Input type={showPassword ? 'text' : 'password'} {...field} />
            )}
          />
          {errors.password_confirm && <Text color="red.500">{errors.password_confirm.message}</Text>}
        </FormControl>
        <Button
          loadingText="Submitting"
          size="lg"
          bg={'blue.400'}
          color={'white'}
          onClick={handleSubmit(onSubmit)}
          _hover={{
            bg: 'blue.500',
          }}
          isLoading={isLoading}
        >
          Cadastrar
        </Button>
        <Link href={'/'}>Já possui conta ? Entre</Link>
      </Stack>
    </Flex>
  )
}