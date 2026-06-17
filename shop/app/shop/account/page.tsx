import AccountSidePanel from "@/components/shop/account/AccountSidePanel";

export default async function Account() {
    return (
    <>
      <div className="flex min-h-[calc(100vh-100px)] max-w-[1500px] mx-auto px-4 md:mt-[100px]">
        <div className="hidden md:block md:w-[250px] lg:w-[300px] shrink-0">
          <AccountSidePanel />
        </div>
        <div className="flex-1">

        </div>
      </div>
    </>
  );
}
