import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

interface Error {
    statusText: string;
    message: string;
}
export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <Container centerContent>
    <VStack>
      <Heading size="lg">Oops!</Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>
        {error.statusText || error.message}
      </Text>
    </VStack>
    </Container>
  );
}