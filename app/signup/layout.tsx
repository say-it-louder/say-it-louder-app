import Logo from "../ui/logo";
import Link from "next/link";
import { audiowide } from "../ui/fonts";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={` flex flex-col justify-center text-center items-center gap-4 px-4 md:px-8 lg:max-w-3xl m-auto`}
    >
      <div className="max-w-[110px] mt-10">
        <Logo />
      </div>
      <div className="space-y-2 max-w-sm">
        <h1 className="font-bold text-2xl">Join to the community</h1>
        <p>
          <span className={`${audiowide.className} uppercase text-base`}>
            Say it louder{` `}
          </span>
          <span>is a community of 5,236900 amazing people.</span>
        </p>
      </div>

      {children}

      <p className="font-extralight text-sm sm:max-w-sm m-a">
        By signing up, you are agreeing to our{" "}
        <a className="simple-anchor">privacy policy</a>,{" "}
        <a className="simple-anchor">terms of use</a> and{" "}
        <a className="simple-anchor">code of conduct</a>
      </p>
      <p className="text-sm mt-20 border-t-2 border-slate-500/50 pt-2 w-full">
        Already have an account?{" "}
        <Link href="/login" className="simple-link text-logo-500">
          Log in
        </Link>
      </p>
    </div>
  );
}
