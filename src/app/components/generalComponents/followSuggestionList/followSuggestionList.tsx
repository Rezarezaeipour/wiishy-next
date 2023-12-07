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
      setList(suggestingLis.suggestions);
    })();
  }, []);

  return (
    <>
      {list ? (
        list.length > 0 ? (
          <div className="flex flex-col">
            <h3 className="block mb-2 font-[900]">People you may know</h3>
            <div className="flex flex-row">
            {list.map((item: any, key: any) => {
              return (
                <RectangularProfileCard
                  user={item}
                  key={item.userID + "" + key}
                />
              );
            })}
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
}

export default FollowSuggestionList;
