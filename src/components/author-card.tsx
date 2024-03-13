"use client";

import { useEffect, useState } from "react";

import { followAuthor, unfollowAuthor } from "@/actions/follow";
import { useUser } from "@/hooks/use-user";
import { numberFormatter } from "@/lib/utils";
import { User } from "@/types";
import Avatar from "@/components/avatar";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface AuthorCardProps {
  author: Partial<User>;
}

// 1d4da00f-6998-4330-8c27-573716cf3719

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const { user } = useUser();
  const { toast } = useToast();

  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && author) {
      const followingAuthor = user.following?.find(
        (following) => following.author_id === author.id
      );

      if (followingAuthor) {
        setIsFollowing(true);
      }
    }
  }, [user, author]);

  const successMessage = isFollowing
    ? `Unfollowed ${author.name}`
    : `Following ${author.name}`;
  const errorMessage = isFollowing
    ? "Coudln't unfollow author"
    : "Couldn't follow author";

  const handleFollowOrUnfollow = async () => {
    try {
      setLoading(true);

      if (!author.id) return;

      if (isFollowing) {
        const response = await unfollowAuthor(author.id);
        setIsFollowing(false);
      }

      if (!isFollowing) {
        const response = await followAuthor(author.id);
        setIsFollowing(true);
      }

      toast({
        title: successMessage,
      });
    } catch (error: any) {
      console.log("[couldn't follow/unfollow] author", error);
      toast({
        title: "Oops!",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <PageLoader />;

  return (
    <div className="w-full max-w-screen-sm gap-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-8 justify-between max-w-screen-sm">
          {author.image_url ? (
            <Avatar
              author={author}
              className="w-20 h-20"
              imageUrl={author.image_url}
            />
          ) : (
            <>
              <div className="w-20 h-20 bg-green-600 rounded-full grid place-items-center text-xl font-semibold">
                {author.name?.slice(0, 1)}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center flex-1 ml-14 justify-between max-w-xs">
          <div>
            <span className="block text-center text-2xl font-bold mb-1">
              {numberFormatter.format(author.followers_count || 0)}
            </span>
            <span className="block text-center text-muted-foreground">
              Followers
            </span>
          </div>
          <div>
            <span className="block text-center text-2xl font-bold mb-1">
              {numberFormatter.format(author.following_count || 0)}
            </span>
            <span className="block text-center text-muted-foreground">
              Following
            </span>
          </div>
          <div>
            <span className="block text-center text-2xl font-bold mb-1">
              {numberFormatter.format(author.quizes?.length || 0)}
            </span>
            <span className="block text-center text-muted-foreground">
              Quizes
            </span>
          </div>
        </div>
      </div>

      <div className="my-4">
        <h3 className="text-lg font-semibold">{author.name}</h3>
        <p className="text-muted-foreground">{author.bio}</p>
      </div>

      <Button
        disabled={loading}
        onClick={handleFollowOrUnfollow}
        variant={"outline"}
        className="mb-2"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default AuthorCard;
