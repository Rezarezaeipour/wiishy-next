import { Skeleton } from "antd";
import { Button, Dialog, Image, Toast } from "antd-mobile";
import { LocationFill } from "antd-mobile-icons";
import Link from "next/link";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function MyProfileWrapper(props: {
  id: number;
  name: string;
  family: string;
  image: string | undefined;
  gender: any;
  location?: any;
  followings: any;
  followers: any;
  bio: any;
  age?: string;
}) {
  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <Image
          width={150}
          height={150}
          alt={props.name}
          src={`https://wiishy-backend.ir${props.image}`}
          className="rounded-full w-1/3 "
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            border: "solid 2px white",
          }}
          fit="cover"
        />

        <h1 className="font-bold text-xl mt-3">
          {props.name || "Name"} {props.family || "Family"}
        </h1>
        <div className="flex flex-row mt-1">
          <p>{props.age}</p>
        </div>
        <h2 className="mt-1">
          (
          {(() => {
            switch (props.gender) {
              case "1":
                return "Man";
              case "2":
                return "Woman";
              case "3":
                return "Other";
            }
          })()}
          )
        </h2>
        {/* <div className="flex flex-row mt-1">
          <LocationFill className="mt-0.5 mr-1" />
          <p>{props.location || "Berlin | Gernmany"}</p>
        </div> */}

        <div className="flex flex-row gap-4 mt-2 mb-2">
          <Link href={`/profile/followings/${props.id}/${props.name}`}>
            <div className="flex flex-col items-center align-middle">
              <p className="font-bold  text-black">{props.followings}</p>
              <p className="text-black">following </p>
            </div>
          </Link>
          <Link href={`/profile/followers/${props.id}/${props.name}`}>
            <div className="flex flex-col items-center">
              <p className="font-bold text-black">{props.followers}</p>
              <p className="text-black">followers</p>
            </div>
          </Link>
        </div>
        <p className="px-4 py-1">
          {props.bio ||
            "  "}
        </p>
        <div className="flex flex-col">
          <div className="flex flex-row gap-1.5 mt-2.5">
            <Link href="/profile/edit-profile">
              <Button className="btn-regular-outline">Edit profile</Button>
            </Link>
            <Link href="/profile/add-event">
              <Button className="btn-regular-outline">Add event</Button>
            </Link>
          </div>
          <div className="mt-1">
            <Button
              className="adm-button adm-button-default adm-button-shape-default btn btn-regular w-full "
              onClick={() => {
                Dialog.alert({
                  content: `https://wiishy-backend.ir/wishlist/${props.id}`,
                  closeOnMaskClick: true,
                  confirmText:"Copy Wishlist link",
                  onConfirm: () => {  Toast.show({
                    content: 'Copied!',
                    position: "bottom",
                  });}
                 
                });
              }}
            >
              Share my wishlist
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfileWrapper;
