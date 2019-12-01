import { RFC822Mail } from "../mail/MIME";

/**
 * Keeps metadata about emails.
 */
export default class MailDatabase {
  /**
   * Must be called before the other functions.
   *
   * @param account {MailAccount} (Optional) Pass null, if you want the same DB for all accounts.
   * @param baseDir {string} The base directory where all messages should be stored.
   *    This does not depend on the account. The store implementation will create
   *    subdirectories for the account and folders as appropriate.
   *    The baseDir must already exist as directory on disk.
   *    The sub dirs will be created automatically.
   * @param options {object} other store-specific options
   */
  async init(account, baseDir, options) {
    assert(!account || account instanceof MailAccount);
    assert(typeof(baseDir) == "string" && baseDir);
    this._baseDir = baseDir + "/" + (account ? account.accountID + "/" : "");
    if (!await fs.existsAsync(this._baseDir)) {
      await fs.mkdirAsync(this._baseDir, MailStore._kDirMode);
    }
    this._options = options;
  }

  /**
   * Saves an email to the database.
   *
   * @param msgFolder {MsgFolder}
   * @param msg {RFC822Mail}
   */
  async saveMessage(msgFolder, msg) {
    assert(msgFolder instanceof MsgFolder);
    assert(msg instanceof RFC822Mail);
    throw new ImplementThis();
  }

  /**
   * Returns all known emails in a folder.
   *
   * @param msgFolder {MsgFolder}
   * @returns {Array of RFC822Mail}
   */
  async listMessagesInFolder(msgFolder) {
    assert(msgFolder instanceof MsgFolder);
    throw new ImplementThis();
  }
}

MailDatabase._kDirMode = 0700; // Only the user can read and write
MailDatabase._kFileMode = 0600; // Ditto