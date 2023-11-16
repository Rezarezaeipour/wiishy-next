import { Skeleton } from "antd";
import { Button, Image } from "antd-mobile";
import { LocationFill } from "antd-mobile-icons";
import Link from "next/link";

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
        <h2 className="mt-1">
          (
          {(() => {
            switch (props.gender) {
              case 1:
                return "Man";
              case 2:
                return "Woman";
              default:
                return "Unknown";
            }
          })()}
          )
        </h2>
        <div className="flex flex-row mt-1">
          <LocationFill className="mt-0.5 mr-1" />
          <p>{props.location || "Berlin | Gernmany"}</p>
        </div>
        <div className="flex flex-row gap-4 mt-2 mb-2">
          <Link href={`/profile/followings/${props.id}/${props.name}`}>
            <div className="flex flex-col items-center align-middle">
              <p className="font-bold">{props.followings}</p>
              <p>following </p>
            </div>
          </Link>
          <Link href={`/profile/followers/${props.id}/${props.name}`}>
            <div className="flex flex-col items-center">
              <p className="font-bold">{props.followers}</p>
              <p>followers</p>
            </div>
          </Link>
        </div>
        <p className="px-4 py-1">
          {props.bio ||
            " A passionate web developer and designer looking for new opportunities in European "}
        </p>
        <div className="flex flex-row gap-2 mt-2.5">
          <Link href="/profile/edit-profile">
            <Button color="default" fill="outline" size="mini">
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MyProfileWrapper;
