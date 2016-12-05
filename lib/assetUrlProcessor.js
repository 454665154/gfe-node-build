/**
 * ����body���ݣ�Ϊ�������js��css���������Ϊ˽��js��css������·��
 * @param  {Object} ���ò�������
 * @param  {Object} ҳ������
 * @return {String} ������ҳ������
 */
module.exports.process = function(config, pageContent) {
    var jsServer = config.jsServer + '/';
    var cssServer = config.cssServer + '/';
    var privateAssetPrefix = '/static';
    var publicAssetRefRegExp = /(<script([^>]*?)(src)\s*=\s*"gmlib([^>]*?)(>\s*<\s*\/script\s*>))|(<link([^>]*?)(href)\s*=\s*"gmlib([^>]*?)>)/gi;
    var privateAssetRefRegExp = /(<script([^>]*?)(src)\s*=\s*"\/js\/([^>]*?)(>\s*<\s*\/script\s*>))|(<link([^>]*?)(href)\s*=\s*"\/css\/([^>]*?)>)/gi;

    pageContent = pageContent.replace(publicAssetRefRegExp, function(publicAssetRef) {
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
        privateAssetReg = privateAssetReg.replace(/(\s*href\s*=\s*")|(\s*src\s*=\s*")/, function(matchContent) {
            return matchContent + privateAssetPrefix;
        });
        return privateAssetReg;
    });
    return pageContent;
};
