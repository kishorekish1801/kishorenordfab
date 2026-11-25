import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
export default function InfoLanding({eyebrow,title,accent,description,body}:{eyebrow:string;title:string;accent?:string;description:string;body:string[]}){return <><PageHero eyebrow={eyebrow} title={title} accent={accent} description={description}/><div className="page-content info-content"><div className="form-card"><h2>{title} {accent}</h2>{body.map((p,i)=><p key={i}>{p}</p>)}<Link href="/contact" className="button button-primary">Contact Our Team</Link></div></div></>}
