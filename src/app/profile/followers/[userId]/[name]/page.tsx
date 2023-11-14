"use client";
import FollowerList from "@/app/components/followerList/followerList";

function Followers({ params }: { params: { userId: number; name: string } }) {
  return (
    <>
      <div className="py-5 px-2 h-full">
        <h1 className="main-head">Followers of {params.name}</h1>
        <h4>All people who are following you in Wiishy app are listed here.</h4>
        <div className="grid mb-10 mt-7">
          <div className="mt-3 h-full">
            <FollowerList userId={params.userId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Followers;
