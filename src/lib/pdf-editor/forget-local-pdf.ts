import { removeBookmarks } from "./bookmarks";
import { forgetDocument } from "./document-cache";
import { removeExam } from "./exam-storage";
import { forgetHistory } from "./history-store";
import { removeLocalPdf } from "./local-pdf-store";
import { removeDocument } from "./storage";
import { forgetFileInStudySets } from "./study-sets";
import { removeView } from "./view-storage";

/** Takes a file from this device out of the browser along with everything
 * kept about it, so nothing is left behind taking up room. */
export async function forgetLocalPdf(id: string): Promise<void> {
  await removeLocalPdf(id);
  removeDocument(id);
  removeView(id);
  removeBookmarks(id);
  removeExam(id);
  forgetHistory(id);
  forgetDocument(id);
  forgetFileInStudySets(id);
}
