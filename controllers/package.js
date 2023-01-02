const { Packages, Services } = require('../models');

const createPackage = async (req, res) => {
    try {
        const { serviceId, type, delivery, revision, noOfConcept, noOfPages, maxDuration, price } = data_package;

        await Packages.create({
            serviceId, type, delivery, revision, noOfConcept, noOfPages, maxDuration, price
        })

        return res.status(200).json({
            message: 'Package has been Created!'
        })

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to create package',
        });
    }
}

const getPackage = async (req, res) => {
    try {
        const { serviceId } = req.params;

        const package = await Packages.findAll({
            where: {
                serviceId: serviceId
            }
        })

        return res.status(200).json({
            data: package
        })
        
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to retrive package',
        });
    }
}

const updatePackage = async (req, res) => {
    try {
        const { serviceId, type, delivery, revision, noOfConcept, noOfPages, maxDuration, price } = data_package;
        const { packageId } = req.params;


        const updateCount = await Packages.update(
            {serviceId, type, delivery, revision, noOfConcept, noOfPages, maxDuration, price},
            { where: {
                packageId: packageId
            }})
        
        if (updateCount < 1) {
            return res.status(401).json({
                message: 'Package not yet update'
            })
        }

        return res.status(200).json({
            message: 'Package has been update!'
        })

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to update package',
        });
    }
}

const getPackageBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const service = await Services.findOne({
            where: {
                slug: slug
            },
            include: {
                model: Packages
            }
        })

        return res.status(200).json({
            data: service.Packages
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to Retrive review',
        });
    }
}

module.exports = { createPackage, getPackage, updatePackage, getPackageBySlug }
