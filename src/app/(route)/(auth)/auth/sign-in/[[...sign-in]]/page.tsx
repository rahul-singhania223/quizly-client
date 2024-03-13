import SignInForm from "./components/sign-in-form";

const SignInPage = () => {
  return (
    <div className="w-full max-w-xl p-4 rounded-lg">
      <h2 className="font-semibold text-xl">Log In</h2>

      <div className="w-full mt-9">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
