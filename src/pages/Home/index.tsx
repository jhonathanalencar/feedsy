import { PostDialog } from "../../components/PostDialog";
import { Posts } from "../../components/Posts";

export function Home(){
  return(
    <main>
      <PostDialog />
      <Posts />
    </main>
  )
}