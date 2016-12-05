/**
 * ����ģ�����ݣ�Ϊ�������js��css���������Ϊ˽��js��css������·��
 * @param  {Object} ���ò�������
 * @param  {Object} ģ������
 * @return {String} ������ģ������
 */
module.exports.process = function(config, templateContent,relativePath) {
    var jsServer = config.jsServer;
    var cssServer = config.cssServer;
    var publicAssetRefRegExp = /(<script([^>]*?)(src)\s*=\s*"gmlib([^>]*?)(>\s*<\s*\/script\s*>))|(<link([^>]*?)(href)\s*=\s*"gmlib([^>]*?)>)/gi;
    var privateAssetRefRegExp = /(<script([^>]*?)(src)\s*=\s*"\/js\/([^>]*?)(>\s*<\s*\/script\s*>))|(<link([^>]*?)(href)\s*=\s*"\/css\/([^>]*?)>)/gi;

    templateContent = templateContent.replace(publicAssetRefRegExp, function(publicAssetRef) {
        if (~publicAssetRef.indexOf("link")) {
            publicAssetRef = publicAssetRef.replace(/\s*href\s*=\s*"/, function(matchContent) {
                return matchContent + cssServer;
            });
        }
        if (~publicAssetRef.indexOf("script")) {
            publicAssetRef = publicAssetRef.replace(/\s*src\s*=\s*"/, function(matchContent) {
                return matchContent + jsServer;
            });
        }

        return publicAssetRef;
    }).replace(privateAssetRefRegExp, function(privateAssetReg) {
    	privateAssetReg =  privateAssetReg.replace(/(\s*href\s*=\s*")|(\s*src\s*=\s*")/, function(matchContent) {
    		return matchContent + relativePath;
        });
        return privateAssetReg;
    });
    return templateContent;
};
