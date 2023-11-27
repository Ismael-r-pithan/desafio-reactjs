import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";

type CardProps = {
    title: string;
    description: string;
    tags: string[]
}
export function CardComponent({ tags, title, description, ...props }: CardProps) {
    return (
        <Card mb={8}>
        <CardHeader>
          <Heading size='md'>{title}</Heading>
          <p>Ismael Pithan</p>
        </CardHeader>
        <CardBody>
          <Text>{description}</Text>
        </CardBody>
        <CardFooter mx={2}>
            {tags.map((tag, index) => (
                (
                    <Button ml={2} maxH={8} key={index} overflow={'hidden'}>{tag}</Button>
                )
            ))}  
        </CardFooter>
      </Card>
    );
}