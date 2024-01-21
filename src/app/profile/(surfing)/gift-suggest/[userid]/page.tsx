"use client";

import getUserData from "@/app/api-client/users";
import AIGiftIdea from "@/app/components/productComponents/aiGiftSuggestion/aiGiftSuggestion";
import ProductList from "@/app/components/profileComponents/productList/productList";
import ProfileWrapperLittle from "@/app/components/profileComponents/profileWrapperLittle/profileWrapperLittle";
import { useEffect, useMemo, useState } from "react";

function Profile({ params }: { params: { userid: number } }) {
  const [newuser, setNewuser] = useState<{
    id: number;
    name: string;
    family: string;
    user_gender: number;
    followings: number;
    followers: number;
    user_desc: string;
    user_image_url: string;
    age?: number;
  }>();
  const ai = useMemo(() => {
    if (newuser && newuser.user_gender && newuser.age) {
      return (
        <AIGiftIdea
          genderid={newuser.user_gender}
          age={newuser.age}
          key={newuser.id}
        />
      );
    }
  }, [newuser]);
  useEffect(() => {
    (async () => {
      const data = await getUserData(params.userid);
      setNewuser(data.users);
    })();
  }, [params.userid]);
  return (
    <>

      <div className="py-5 px-5">
        <ProfileWrapperLittle
          id={params && params.userid ? params.userid : 0}
        />

        <h1 className="second-head ml-2.5 mt-4 text-tiffany-dark">
          {newuser?.name ? newuser?.name + '\'s wishlist' : ''}
          {/* <span className="text-xs">(In the next 30 days)</span> */}
        </h1>
        <ProductList userId={params && params.userid ? params.userid : 0} />
      </div>

      <div className="py-4 px-5 pb-8 bg-white " style={{borderTop:'solid thin var(--wiishy-tiffany-light)'}}>
        <h1 className="second-head mt-4 text-tiffany-dark">
          Wiishy AI suggestions for {newuser?.name}
        </h1>
        <h1 className="second-head text-tiffany mt-0">
          <span className="text-xs">
            A {newuser?.age} years old
            {newuser?.user_gender
              ? (() => {
                  switch (newuser.user_gender.toString()) {
                    case "1":
                      return " Man";

                    case "2":
                      return " Woman";
                    case "3":
                      return " ";
                  }
                })()
              : " "}
          </span>   
        </h1>
        <div className="mt-4 mb-9">{ai}</div>
      </div>  

    </>
  );
}

export default Profile;
