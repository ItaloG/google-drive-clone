import { describe, test, expect, jest } from "@jest/globals";
import fs from "fs";
import FileHelper from "../../src/fileHelper.js";

describe("#FileHelper", () => {
  describe("#getFileStatus", () => {
    test("it should return files statuses in correct format", async () => {
      const statMock = {
        dev: 2080,
        mode: 33188,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 194023,
        size: 67298,
        blocks: 136,
        atimeMs: 1680137258613.7405,
        mtimeMs: 1680131981403.7473,
        ctimeMs: 1680132666603.7378,
        birthtimeMs: 1680131981403.7473,
        atime: "2023-03-30T00:47:38.614Z",
        mtime: "2023-03-29T23:19:41.404Z",
        ctime: "2023-03-29T23:31:06.604Z",
        birthtime: "2023-03-29T23:19:41.404Z",
      };

      const mockUser = "italo";
      process.env.USER = mockUser;
      const filename = "file.png";

      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus("/tmp");

      const expectedResult = [
        {
          size: "67.3 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});
