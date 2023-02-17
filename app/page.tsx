"use client"
import Link from 'next/link'
import { Grid, Card, Text } from '@nextui-org/react';

const MockItem = ({ text }: any) => {
  return (
    <Card css={{ h: "$20", $$cardColor: '$colors$primary' }}>
      <Card.Body>
        <Text h6 size={15} color="white" css={{ m: 0 }}>
          {text}
        </Text>
      </Card.Body>
    </Card>
  );
};

export default function Home() {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12}>
        <h1>Some content</h1>
        <h4>More content </h4>
        <Link href="/code">Retrieve code from email</Link>
        <MockItem text={"1 of 2"} />
      </Grid>
      <Grid xs={12}>
        <p>(unfinished)PIN LOGIN</p> 
        <a target="_blank" href="https://github.com/plasmadice/seemail">Link to github repo</a>
        <MockItem text={"2 of 2"} />
      </Grid>
    </Grid.Container>
  );
}
