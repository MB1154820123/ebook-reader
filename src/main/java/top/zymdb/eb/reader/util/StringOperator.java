package top.zymdb.eb.reader.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringOperator {
    /**
     * @desc 将nid的标注id减1
     * @time 2022/10/19 9:04
     * @author mabo
     * @param nid
     * @return
     */
   public static String noteIdSub(String nid){
       Integer i = Integer.valueOf(nid.split("-")[3].replaceAll("[a-z]*",""));
       if ( i > 1 ) {
           i = i - 1;
       }
       Pattern p = Pattern.compile("([^\\-]*\\-[^\\-]*\\-[^\\-]*\\-[bm])([0-9]+)(\\-[^\\-]*)");
       Matcher m = p.matcher(nid);
       if ( m.find() ){
           nid = m.group(1) + i + m.group(3);
       }
        return nid;
   }

    public static String[] getStrings(String[] input) {
        String[] s2 = new String[input.length];
        String[] s3 = new String[input.length];
        int n = 0;
        for (String s : input) {
            s2[n] = s.replaceAll("(-)([0-9])(:)","$10$2$3").replaceAll("(:)([0-9])(-)","$10$2$3");
            n++;
        }
        for (int i=0;i<s2.length-1;i++){
            for (int j=0;j<s2.length-i-1;j++) {
                if(s2[j].compareTo(s2[j+1])>0){
                    String temp=s2[j];
                    s2[j]=s2[j+1];
                    s2[j+1]=temp;
                }
            }
        }

        int m = 0;
        for (String key : s2) {
            s3[m] = key.replaceAll("(-)(0)([0-9])(:)","$1$3$4").replaceAll("(:)(0)([0-9])(-)","$1$3$4");
            m++;
        }
        return s3;
    }

}
