import AccountSidePanel from "@/components/shop/account/AccountSidePanel";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
    <>
      <div className="flex min-h-[calc(100vh-100px)] max-w-[1500px] mx-auto px-4 mt-[100px]">
        <div className="hidden md:block md:w-[250px] lg:w-[350px] shrink-0">
          <AccountSidePanel />
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </>
  );
}