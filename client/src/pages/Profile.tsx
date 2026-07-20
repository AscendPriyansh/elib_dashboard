// import { useQuery } from "@tanstack/react-query";

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Profile() {
    return (
        <div className="w-full">
            <div className="m-4">
                <AspectRatio ratio={8 / 1} className="rounded-lg bg-muted overflow-hidden">
                    <img
                        src="https://avatar.vercel.sh/shadcn7"
                        alt="Photo"
                        className="h-full w-full object-cover"
                    />
                </AspectRatio>
                <div className="ml-40">
                <div className="flex">
                    <Avatar className="h-28 w-28 relative -mt-14 sm:-mt-16 inline-block">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                <div className="mt-4">
                    <h1 className="font-semibold text-lg">Priyansh Tiwari</h1>
                </div>
                </div>
            </div>


        </div>
    )
}

export default Profile;