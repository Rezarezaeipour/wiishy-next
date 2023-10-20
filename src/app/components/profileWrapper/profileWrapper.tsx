import { Button, Image } from "antd-mobile";
import { LocationFill } from "antd-mobile-icons";

function ProfileWrapper(props: { name: string; image: string | undefined; gender: number; location: any; following: any; followers: any; bio: any; }) {
    return (
        <>
            <div className="flex flex-col items-center pt-5">
                <Image alt={props.name || 'A wiishy user'} src={props.image} className="rounded-full w-1/3 " />
                <h1 className="font-bold text-xl mt-3">{props.name || 'A wiishy user'}</h1>
                <h2 className="mt-1">({props.gender || 'He/Him'})</h2>
                <div className="flex flex-row mt-1">
                    <LocationFill className="mt-0.5 mr-1" />
                    <p>{ props.location || 'Berlin | Gernmany'}</p>
                </div>
                <div className="flex flex-row gap-4 mt-2 mb-2">
                    <div className="flex flex-col items-center align-middle">
                        <p className="font-bold">{props.following || '-1'}</p>
                        <p>following</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-bold">{props.followers || '-2'}</p>
                        <p>followers</p>
                    </div>
                </div>

                <p className="px-4 py-1">
                    { props.bio || ' A passionate web developer and designer looking for new opportunities in European ' }
                </p>
                <div className="flex flex-row gap-2 mt-2.5">
                    <Button color='default' fill='outline' size="mini">
                        Follow
                    </Button>
                    <Button color='default' fill='outline' size="mini">
                        +
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ProfileWrapper;