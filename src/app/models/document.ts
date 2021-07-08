import { CourseService } from "../services/course.service";
import { Course } from "./course";

export class Document {
    constructor(){}
   public piece_jointe?:File;
   public cours?:Course;
  public file_name?:string;
}
