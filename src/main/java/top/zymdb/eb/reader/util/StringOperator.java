package top.zymdb.eb.reader.util;

public class StringOperator {
    /**
     * @type tool_java
     * @desc 对处理结束后的字符串数组进行倒序排列
     * @time 2022/11/2 22:06
     * @author mabo
     * @param input
     * @return
     */
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

    /**
     * 该函数判断一个字符串是否包含标点符号（中文英文标点符号）。
     * 原理是原字符串做一次清洗，清洗掉所有标点符号。
     * 此时，如果原字符串包含标点符号，那么清洗后的长度和原字符串长度不同。返回true。
     * 如果原字符串未包含标点符号，则清洗后长度不变。返回false。
     * @param s
     * @return
     */
    public static boolean checkContainsPunctuation (String s) {
        boolean b = false;
        String tmp = s;
        tmp = tmp.replaceAll("(,|，|\\.|。|!|！|\\?|？)", "");
        if (s.length() != tmp.length()) {
            b = true;
        }
        return b;
    }
}
