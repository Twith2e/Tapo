import { LucideCircleUserRound, LucidePlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FindContactResponse, User } from "@/utils/types";
import { useState } from "react";
import { isValidEmail } from "@/utils/validation";
import api from "@/utils/api";
import useContact from "@/hooks/useContact";
import { useConversationContext } from "@/contexts/ConversationContext";

const NewChatButton = () => {
  const { fetchingContactList, contacts, filterContacts } = useContact();
  const { createConversation } = useConversationContext();
  const [result, setResult] = useState<Partial<User> | null>(null);

  async function handleSearch(email: string) {
    let timeout: ReturnType<typeof setTimeout>;
    if (!isValidEmail(email)) {
      filterContacts(email);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const response = await api.get<FindContactResponse>(
          `/users/find/?email=${email}`
        );
        if (response.data.matched) {
          setResult(response.data.user);
        } else {
          setResult(null);
        }
      }, 2000);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <LucidePlus size={24} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-5 space-y-5 max-h-96">
        <DropdownMenuGroup className="fixed top-5 w-full">
          <DropdownMenuLabel>New Chat</DropdownMenuLabel>
          <div className="border-b-2 border-b-sky-500 rounded-md border w-[85%]">
            <input
              className="h-8 px-2 text-sm outline-none w-full"
              placeholder="Search name or email"
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
            />
          </div>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="overflow-y-auto mt-20 space-y-4">
          <DropdownMenuItem className="w-fit">
            <div className="flex gap-2 items-center">
              <LucideCircleUserRound />
              <span>New contact</span>
            </div>
          </DropdownMenuItem>
          <h1>All contacts</h1>
          {fetchingContactList ? (
            <div>Loading...</div>
          ) : result ? (
            <>
              <div
                className="flex gap-2 items-center"
                onClick={() => {
                  createConversation(result.email || "", result._id || "");
                }}
              >
                {result.profilePic ? (
                  <img
                    src={result.profilePic}
                    alt={result.email}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <LucideCircleUserRound />
                )}
                <span className="text-sm">{result.email}</span>
              </div>
            </>
          ) : contacts && contacts.length ? (
            contacts.map((contact) => (
              <DropdownMenuItem key={contact._id}>
                <div className="flex gap-2 items-center">
                  {contact.contactProfile.profilePic ? (
                    <img
                      src={contact.contactProfile.profilePic}
                      alt={contact.localName}
                    />
                  ) : (
                    <LucideCircleUserRound />
                  )}
                  <span>{contact.localName}</span>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="text-sm text-gray-300 text-center">
              No contacts found
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NewChatButton;
