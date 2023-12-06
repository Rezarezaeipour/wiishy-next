"use client";
import { suggestedUsers } from "@/app/api-client/users";
import RectangularProfileCard from "../../profileComponents/rectangularProfileCard/rectangularProfileCard";
import { useEffect, useState } from "react";
import { Profile } from "next-auth";

function FollowSuggestionList() {
  const [list, setList] = useState<[Profile]>();
  useEffect(() => {
    (async () => {
      var suggestingLis = await suggestedUsers();
      console.log(suggestingLis);
      setList(suggestingLis.suggestions);
    })();
  }, []);

  return (
    <>
      {list
        ? list.length > 0
          ? list.map((item: any, key: any) => {
              return <RectangularProfileCard user={item} key={item.userID+""+key} />;
            })
          : ""
        : ""}
    </>
  );
}

export default FollowSuggestionList;
