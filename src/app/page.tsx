import { Icons } from "@/components/icons";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Hello world</Button>
      <Typography.h1>Heading 1</Typography.h1>
      <Typography.h2>Heading 2</Typography.h2>
      <Typography.h3>Heading 3</Typography.h3>
      <Typography.h4>Heading 4</Typography.h4>
      <Typography.p>pharagraphy</Typography.p>
      <Typography.lead>lead</Typography.lead>
      <Typography.large>large</Typography.large>
      <Typography.small>small</Typography.small>
      <Typography.mute>mute</Typography.mute>

      <Icons.search></Icons.search>
    </main>
  );
}
