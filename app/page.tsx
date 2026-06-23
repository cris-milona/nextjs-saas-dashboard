import { redirect } from "next/navigation";

import { paths } from "@/lib/paths";

const Home = () => {
  redirect(paths.home());
};

export default Home;
