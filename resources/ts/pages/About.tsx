import {
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { Box, lineHeight } from "@mui/system";
import React from "react";
import styled from "@emotion/styled";

import { makeStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { ZenKurenaidoFont } from "../theme";
import { RowdiesFont } from "../theme";

import todoImage from "../../images/todoimage.jpg";

import todoImg from "../../images/todoImage.png";

const NoteComponent = styled("div")({
    lineHeight: "2.5em",
    backgroundSize: "auto 2.5em",
    backgroundImage:
        "linear-gradient(180deg, rgba(100, 100, 100, 0) 0%, rgba(100, 100, 100, 0) 98%, #646464 100%)",
});

const MarkerOrange = styled("span")({
    background: "linear-gradient(transparent 60%, #ffa500 0%);",
});

const About = () => {
    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100%",
                    maxWidth: "800px",
                    m: "auto",
                    py: 5,
                }}
            >
                <ThemeProvider theme={ZenKurenaidoFont}>
                    <Typography variant="h3" align="center" sx={{ py: 3 }}>
                        しくじりTODOとは？
                    </Typography>

                    <Paper
                        sx={{
                            p: 3,
                            mt: 2,
                            mb: 5,
                            mx: 2,
                            backgroundColor: "#FFFFF0",
                        }}
                    >
                        <NoteComponent>
                            <MarkerOrange>
                                達成できなかったTODOリストをしくじりTODOとして共有するサービスです。
                                <br />
                            </MarkerOrange>
                            Twitter民は意識が高い人が多いので、
                            プログラミング学習者や初学者は不安が沢山あるでしょう。
                            <br />
                            <MarkerOrange>
                                でも誰にだって「しくじりTODO」はあります。
                            </MarkerOrange>
                            <br />
                            明日やろうは馬鹿野郎かもしれません。
                            でもゆっくりでも一歩ずつ頑張っているアナタは偉い！
                        </NoteComponent>
                    </Paper>

                    <Divider />

                    <Typography variant="h3" align="center" sx={{ py: 3 }}>
                        使い方
                    </Typography>

                    <Grid
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "30px",
                            py: 4,
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                minWidth: "350px",
                                maxWidth: "350px",
                            }}
                        >
                            <img
                                src={`${window.location.origin}/img/todoimage.jpg`}
                                alt="image"
                                width="350px"
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{ minWidth: "350px", maxWidth: "350px" }}
                        >
                            <Box sx={{ flexWrap: "wrap" }}>
                                <Typography
                                    variant="h4"
                                    component="div"
                                    sx={{ pb: 3 }}
                                >
                                    TODOリストを登録
                                </Typography>
                                <Typography variant="body1">
                                    簡単に今日のTODOリストを作成することが出来ます。
                                    作成したTODOは完了状態および削除することができます。
                                    無理なくこなせるタスク量(3-5個)にしておきましょう。
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "30px",
                            py: 4,
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                minWidth: "350px",
                                maxWidth: "350px",
                            }}
                        >
                            <img
                                src={`${window.location.origin}/img/shikuziriImage.png`}
                                alt="image"
                                width="350px"
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{ minWidth: "350px", maxWidth: "350px" }}
                        >
                            <Box sx={{ flexWrap: "wrap" }}>
                                <Typography
                                    variant="h4"
                                    component="div"
                                    sx={{ pb: 3 }}
                                >
                                    しくじりTODOを閲覧
                                </Typography>
                                <Typography variant="body1">
                                    前日作成したタスクの中で完了しなかったものを表示します。
                                    自分含めその他ユーザーのしくじりTODOを閲覧可能です。
                                    昨日できなかった事は今日か明日にでも頑張りましょう！
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "30px",
                            py: 4,
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                minWidth: "350px",
                                maxWidth: "350px",
                            }}
                        >
                            <img
                                src={`${window.location.origin}/img/shikuziriImage.png`}
                                alt="image"
                                width="350px"
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{ minWidth: "350px", maxWidth: "350px" }}
                        >
                            <Box sx={{ flexWrap: "wrap" }}>
                                <Typography
                                    variant="h4"
                                    component="div"
                                    sx={{ pb: 3 }}
                                >
                                    しくじりを共有しよう
                                </Typography>
                                <Typography variant="body1">
                                    やっぱりサービスを使ってもらうにはOGP活用したSNSシェアが必須だと思いますので、
                                    Twitter共有ボタンから簡単に共有出来る機能を追加予定です。
                                    (なんせSPAで動的なOGP生成をする技能が足りなかったので、
                                    いずれ Next.js × laravel で挑戦します、、、)
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </Box>
        </>
    );
};

export default About;
