"use client"
import Link from 'next/link'
import { Grid, Card, Text } from '@nextui-org/react';

const MockItem = ({ text, children }: any) => {
  return (
    <Card css={{ h: "$100", $$cardColor: '$colors$primary' }}>
      <Card.Body>
          {text ? <Text h6 size={15} color="white" css={{ m: 0 }}>{text}</Text> : children}
      </Card.Body>
    </Card>
  );
};

export default function Home() {
  return (
    <Grid.Container style={{height: "50vh"}} gap={2} justify="center">
      <Grid xs={12} style={{height: "100%"}}>
        <MockItem>
          <h1>Some content</h1>
          <h4>More content </h4>
          <Link href="/code">Retrieve code from email</Link>
        </MockItem>
      </Grid>
      <Grid xs={12} style={{height: "100%"}}>
        <MockItem>
          <p>(unfinished)PIN LOGIN</p> 
          <a target="_blank" href="https://github.com/plasmadice/seemail">Link to github repo</a>
        </MockItem>
      </Grid>
    </Grid.Container>
  );
}
