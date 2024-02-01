import Halloween from "../assets/events/halloween2.jpg";
import Christmas from "../assets/events/christmas.jpg";
import Valentine from "../assets/events/valentine.jpg";
import Songkran from "../assets/events/songkran.jpg";

export const EVENT_IMAGE = [
  {
    img: Halloween,
    alt: "background",
    title: "Halloween Event",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id possimus voluptates fugit atque officiis obcaecati, quia explicabo sint et omnis veniam autem necessitatibus corporis, veritatis odit exercitationem modi, consectetur aspernatur!",
  },
  {
    img: Christmas,
    alt: "background",
    title: "Chirstmas Event",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id possimus voluptates fugit atque officiis obcaecati, quia explicabo sint et omnis veniam autem necessitatibus ",
  },
  {
    img: Valentine,
    alt: "background",
    title: "Valentine Event",
    detail:
      "Id possimus voluptates fugit atque officiis obcaecati, quia explicabo sint et omnis veniam autem necessitatibus corporis, veritatis odit exercitationem modi, consectetur aspernatur!",
  },
  {
    img: Songkran,
    alt: "background",
    title: "SongKran Event",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id possimus voluptates fugit atque officiis obcaecati, quia explicabo sint et omnis veniam autem necessitatibus corporis, ",
  },
];

export type TypeImage = typeof EVENT_IMAGE;
