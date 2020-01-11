import a from "./a.lines"
import bUnsorted from "./b.lines"
import bSorted from "./b.lines?sort"
import fromReadme from "./fromReadme.lines?nonEmpty=false"
import fromReadmeNormalized from "./fromReadme.lines?sort&unique"
import pick from "./r.lines?randomPick"
import unique from "./u.lines?unique"

export default {
  a,
  bUnsorted,
  bSorted,
  unique,
  fromReadme,
  fromReadmeNormalized,
  pick: pick(),
}