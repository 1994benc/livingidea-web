import { Menu, Transition } from "@headlessui/react";
import { LoginIcon, LogoutIcon, UserIcon } from "@heroicons/react/solid";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "../images/Avatar";

export function AccountDropdown() {
  const [user, loading, error] = useAuthState(getAuth());
  const router = useRouter();
  return (
    <div className="relative">
      <Menu>
        <Menu.Button className={"icon-btn"}> 
          {!user?.photoURL && <UserIcon className="w-6 h-6" />}
          {user?.photoURL && <Avatar small={true} imageUrl={user?.photoURL} />}
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 w-48  text-white flex flex-col bg-black rounded shadow">
            {!user && (
              <Menu.Item>
                {({ active }) => (
                  <Link href="/login">
                    <a
                      className={`${
                        active && "bg-living-blue"
                      } p-3 border-b border-gray-800 rounded flex gap-2 items-center`}
                    >
                      <div>
                        <LoginIcon className="h-6 w-6" />
                      </div>
                      <div>Log in</div>
                    </a>
                  </Link>
                )}
              </Menu.Item>
            )}
            {user && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active && "bg-living-blue"
                    } p-3 border-b border-gray-800 rounded cursor-pointer flex gap-2 items-center`}
                    onClick={async () => {
                      await signOut(getAuth());
                      router.replace("/login");
                    }}
                  >
                    <div>
                      <LogoutIcon className="h-6 w-6" />
                    </div>
                    <div>Log out</div>
                  </a>
                )}
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
