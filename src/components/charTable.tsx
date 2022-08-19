// import { Image } from "@mui/icons-material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Char from "@src/type/char";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const CharTable: FC<{ chars: Char[] }> = ({ chars }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>캐릭터 번호</TableCell>
            <TableCell>캐릭터 모습</TableCell>
            <TableCell align="right">캐릭터 이름</TableCell>
            <TableCell align="right">좋아요 수</TableCell>
            <TableCell align="right">싫어요 수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chars.map((char, i) => (
            <TableRow
              key={char.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {char.id}
              </TableCell>
              <TableCell component="th" scope="row">
                <Image
                  src={char.img}
                  alt="preview"
                  width={100}
                  height={100}
                ></Image>
              </TableCell>
              <TableCell component="th" scope="row">
                <Link href={`/char/${char.id}`}>
                  <Button>{char.name}</Button>
                </Link>
              </TableCell>
              <TableCell component="th" scope="row">
                {char.like}
              </TableCell>
              <TableCell component="th" scope="row">
                {char.hate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CharTable;
