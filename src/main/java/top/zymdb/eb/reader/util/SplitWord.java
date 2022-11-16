package top.zymdb.eb.reader.util;

import com.huaban.analysis.jieba.JiebaSegmenter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class SplitWord {
    static String path = Thread.currentThread().getContextClassLoader().getResource("").getPath();
    static FileOperator fo = new FileOperator();
    public static void main(String[] args) throws IOException {
        String content = "算法是定义良好的计算过程";
        List<String> stop_words = Arrays.asList(fo.readFile(path + "/dicts/stop_words.txt").split("\n"));
        JiebaSegmenter segmenter = new JiebaSegmenter();
        List<String> result = segmenter.sentenceProcess(content);
        System.out.println("没有过滤停用词======" + result);
        result = result.stream().map(o -> o.trim()).filter(o -> !stop_words.contains(o)).collect(Collectors.toList());
        System.out.println("过滤停用词=========" + result);
    }
}

