import Image from "next/image";
import GiftDetail from "./giftDetail";

export default function Gift({ params }: { params: { giftid: string } }) {
  return (
    <>
      <GiftDetail giftid={Number.parseInt(params.giftid)}></GiftDetail>
    </>
  );
}
