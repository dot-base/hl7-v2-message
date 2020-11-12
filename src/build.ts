import Hl7Types from "@/init/hl7Types";
import { definitions } from "hl7-dictionary";
import Hl7 from '@/types/hl7';
import Hl7Model from '@/init/hl7Model';

//TODO: how to handle different versions? init all versions on build here or init only on usage?
const initTypes :Hl7 = Hl7Types.init(definitions["2.3"]);
Hl7Model.createClassFiles(initTypes)
