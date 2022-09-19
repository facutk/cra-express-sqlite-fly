import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;

    // POST a request with the users email or phone number to the server
    fetch('/mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          // The request successfully completed and the email to the user with the
          // magic login link was sent!
          // You can now prompt the user to click on the link in their email
          // We recommend you display json.code in the UI (!) so the user can verify
          // that they're clicking on the link for their _current_ login attempt
          // document.body.innerText = json.code;
          console.log({ json });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={'calc(100vh - 70px)'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          boxShadow={'lg'}
          maxW={'md'}
          my={12}
          p={6}
          rounded={'xl'}
          spacing={4}
          w={'full'}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Sign in
          </Heading>
          <Text
            color={useColorModeValue('gray.800', 'gray.400')}
            fontSize={{ base: 'sm', sm: 'md' }}>
            You&apos;ll get an email with a login link
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              type="submit"
              _hover={{
                bg: 'blue.500',
              }}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default Login;
