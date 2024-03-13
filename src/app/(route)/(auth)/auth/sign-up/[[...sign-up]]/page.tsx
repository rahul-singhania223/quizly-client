import SignUpForm from "./components/sign-up-form";

const SignUpPage = async () => {
  return (
    <div className="w-full max-w-xl p-4 rounded-lg">
      <h2 className="font-semibold text-xl">Sign Up</h2>

      <div className="w-full mt-9">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
