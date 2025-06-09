import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/app/components/ui/menubar"
import Link from "next/link";
import {MenuSeparator} from "@radix-ui/react-menu";
import Image from "next/image";
import {ModeToggle} from "@/app/components/theme/mode-toggle";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";


export default function TopNav() {
    return (
        <Menubar className="flex items-center rounded-none h-14">
            <div className="flex-none">
                <MenubarMenu>
                    <Link href="/"><Image src="/logo.png" alt="ai video generated logo" width={50} height={50}/></Link>
                </MenubarMenu>
            </div>
            <div className="flex flex-grow items-center justify-end gap-3">
                <ModeToggle/>
                <MenubarMenu>
                    <MenubarTrigger className="text-base font-normal">
                        Dashboard
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Task 1
                        </MenubarItem>
                        <MenuSeparator/>
                        <MenubarItem>
                            Task 2
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </MenubarMenu>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </Menubar>
    )
}